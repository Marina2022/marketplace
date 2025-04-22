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
                          product,
                          setProduct
                        }) => {
  return (
    <div>
      <h3 className={s.title}>Документация к товару</h3>
      <div className={s.filesList}>
        <DocsFileInput file={instructionFile} 
                       setFile={setInstructionFile} 
                       label="Инструкция по эксплуатации"
                       id="id-1"
                       product={product}        
                       type="instruction"
                       setProduct={setProduct}
        />
        <DocsFileInput file={documentationFile}
                       setFile={setDocumentationFile}
                       label="Техническая документация"
                       id="id-2"
                       product={product}
                       type="documentation"
                       setProduct={setProduct}
        />
        <DocsFileInput file={certificateFile}
                       setFile={setCertificateFile}
                       label="Cертификат к товару"
                       id="id-3"
                       product={product}
                       type="certificate"
                       setProduct={setProduct}
        />
      </div>
    </div>
  );
};

export default DocsFileInputs;