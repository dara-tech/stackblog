import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useStore from "../store";
import { createSlug, uploadFile } from "../utils";

import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconColorPicker, IconUpload, IconX } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";
import { useCreatePost } from "../hooks/post-hook";

const WritePost = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const { isPending, mutate } = useCreatePost(toast, toggle, user?.token);
  const [category, setCategory] = useState("NEWS");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const theme = colorScheme === "dark";

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write post here...." }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const handleSubmit = async () => {
    if (!fileURL || !category || !title) {
      toast.error("All fields are required");
      return;
    }

    const slug = createSlug(title);

    mutate({
      title,
      slug,
      cat: category,
      img: fileURL,
      desc: editor.getHTML(),
    });
  };

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      uploadFile(setFileURL, setUploadProgress, file)
        .then(() => {
          setIsUploading(false);
          setUploadProgress(0); // Reset progress after upload completion
          setUploadedImage(URL.createObjectURL(file)); // Show uploaded image
        })
        .catch(() => setIsUploading(false));
    }
  }, [file]);

  return (
    <>
      <RichTextEditor editor={editor}>
      <div className="w-full flex flex-col gap-4 py-4">
        <TextInput
          withAsterisk
          label="Post title"
          className="w-full px-4"
          placeholder="Enter Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Select
          label="Category"
          defaultValue={"NEWS"}
          placeholder="Pick Category"
          data={["NEWS", "SPORTS", "CODING", "EDUCATION", "FASHION"]}
          onChange={(val) => setCategory(val)}
          className="w-full px-4"
        />

        {uploadedImage && (
          <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 mt-4 px-4">
            <button
              onClick={() => {
                setFile(null);
                setUploadedImage(null);
              }}
              className="flex-shrink-0 focus:outline-none"
            >
              <IconX size={24} strokeWidth={1.5} />
            </button>

            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-full p-4 rounded-md"
            />
          </div>
        )}

        <div className="flex w-auto items-center mt-7 mx-4 rounded-full p-1 ring-1">
          <label
            className="flex-1 items-center text-base cursor-pointer"
            htmlFor="imgUpload"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <IconUpload size={24} strokeWidth={1.5} />
          </label>
          {isUploading && <Loading />}
          {isUploading && (
            <div className="flex items-right justify-end gap-5 py-1 w-full">
              <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>


        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}

        <RichTextEditor.Toolbar sticky stickyOffset={20}>
          <RichTextEditor.ColorPicker
            colors={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={true}>
              <IconColorPicker size={24} strokeWidth={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.UnsetColor />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className="py-8" />
      </RichTextEditor>

      <div className="w-full flex items-end justify-end mt-6">
        <Button
          className={theme ? "bg-blue-600" : "bg-black"}
          onClick={() => handleSubmit()}
        >
          Submit Post
        </Button>
      </div>

      {isPending && <Loading />}
      <Toaster richColors />
    </>
  );
};

export default WritePost;
