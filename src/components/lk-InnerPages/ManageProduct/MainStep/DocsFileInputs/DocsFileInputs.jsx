import s from './DocsFileInputs.module.scss';
import DocsFileInput
  from "@/components/lk-InnerPages/ManageProduct/MainStep/DocsFileInputs/DocsFileInput/DocsFileInput.jsx";

const DocsFileInputs = ({
                          instructionFile,
                          setInstructionFile,
                          documentationFile,
                          setDocumentationFile,
                          certificateFile,
                          setCertificateFile,
                        }) => {
  return (
    <div>

      <h3 className={s.title}>Документация к товару</h3>


      <div className={s.filesList}>
        <DocsFileInput file={instructionFile} 
                       setFile={setInstructionFile} 
                       label="Инструкция по эксплуатации"
                       id="id-1"/>

        <DocsFileInput file={documentationFile}
                       setFile={setDocumentationFile}
                       label="Техническая документация"
                       id="id-2"/>

        <DocsFileInput file={certificateFile}
                       setFile={setCertificateFile}
                       label="Cертификат к товару"
                       id="id-3"/>
      </div>
    </div>
  );
};

export default DocsFileInputs;