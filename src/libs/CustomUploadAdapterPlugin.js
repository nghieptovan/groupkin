import CustomUploadAdapter from "./CustomUploadAdapter";

export default function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    // Configure the URL to the upload script in your back-end here!
    return new CustomUploadAdapter(loader, editor);
  };
}