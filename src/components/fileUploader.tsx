import {
  FileUploaderMinimal,
  OutputFileEntry,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useRef, useState } from "react";

function App(fileEntry: any, onChange: any) {
  const [uploadedFiles, setUploadedFiles] = useState<
    OutputFileEntry<"success">[]
  >([]);
  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);
  return (
    <div>
      <FileUploaderMinimal
        classNameUploader="uc-light uc-orange"
        pubkey="7c9e10a8885da9ad9047"
      />
    </div>
  );
}

export default App;
