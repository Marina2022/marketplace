import s from './LkRequestsPage.module.scss';
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "@/components/ui/Button/Button.jsx";

const LkRequestsPage = () => {
  const {rightBarRef, rightPanelOpen} = useOutletContext();

  useEffect(() => {
    if (!rightBarRef.current) return
    console.log('rightBarRef = ', rightBarRef.current.getBoundingClientRect().bottom);
  }, [rightBarRef]);

  const [showRightBarItem, setShowRightBarItem] = useState(false);

  const handlePushClick = () => {
    setShowRightBarItem(prev => !prev)
  }

  return (
    <>
      {
        showRightBarItem && rightBarRef.current && <div className={s.rightBarAdditionalItem} style={{top: rightBarRef.current.getBoundingClientRect().bottom}}>Y</div>
      }

      <div className={s.requestsPage}>
        <div className={s.leftSideMenu}>
          Заявки
        </div>
        <div className={`${s.contentWrapper} ${rightPanelOpen ? s.contentWrapperRightPanelOpen : ''}`}>
          <div className={s.content}>

            <Button onClick={handlePushClick}>Push me</Button>

            <br/>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quibusdam saepe. A aperiam aut autem culpa
            doloremque ducimus error est et, eum facere maxime modi nihil non obcaecati odio officiis optio placeat, quo
            repellat repellendus sit temporibus vitae. Aliquid animi beatae, commodi consequuntur debitis delectus,
            deleniti dicta dolores, ducimus est et eveniet hic id ipsam iste itaque libero pariatur provident quam rem.
            Amet consequatur cumque error et illo, itaque nam perferendis, quis quos, unde veritatis vero voluptatum!
            Aspernatur beatae commodi consequatur debitis distinctio ducimus earum esse et harum, in magnam maxime
            minima
            nihil nobis, optio placeat quasi quibusdam quod quos repudiandae rerum saepe sint, sunt tempore veritatis?
            Aliquid architecto assumenda atque autem consequatur delectus deleniti dolore doloremque dolores, est
            excepturi exercitationem fugiat ipsum iusto labore magnam modi numquam officia omnis porro, quisquam quos
            reiciendis reprehenderit similique sint totam vel voluptatum? Accusantium amet dolores inventore laudantium
            officiis omnis pariatur, ratione similique sunt temporibus? Adipisci amet at autem blanditiis consequuntur
            cumque dolor dolore doloremque earum enim et exercitationem fugiat id impedit in, molestiae obcaecati
            officiis
            quia quo rem saepe sunt tempora totam, ullam vel. Aspernatur atque beatae blanditiis consectetur cupiditate
            deleniti dolorem est, eum expedita ipsa maiores minima minus neque nihil officia officiis possimus qui
            reiciendis sapiente sint suscipit tempora tempore temporibus ullam ut vel vero voluptatem! Fugiat impedit
            possimus quaerat sequi! Doloremque error ipsa iusto magnam neque nisi repellat. Ab ad alias amet blanditiis
            debitis, deserunt enim eos error, excepturi facere laudantium molestias mollitia quia, quis ratione repellat
            repellendus sed vero! Adipisci blanditiis corporis est eveniet illum iure non nulla quos ut. Architecto
            beatae
            blanditiis earum laudantium neque non nostrum odio perferendis reprehenderit sunt. Ab autem dignissimos
            dolorem expedita, fugit, iste laborum minus nobis, obcaecati perferendis quasi quis repellendus sapiente
            tenetur voluptate! Blanditiis error eum nobis optio, possimus quia quisquam. Aspernatur autem blanditiis
            consectetur corporis debitis dignissimos earum eius eos impedit laudantium mollitia nemo neque, nostrum
            officia pariatur sit vero voluptates? A asperiores at, aut autem beatae cupiditate debitis distinctio
            dolore,
            dolorem earum eos esse et exercitationem fugit illum impedit ipsa itaque labore laborum maxime mollitia nemo
            nobis placeat quas quia sequi temporibus velit veritatis voluptates voluptatibus! Amet blanditiis
            dignissimos
            eligendi ipsam iure labore minima, nobis optio possimus quas rerum similique, veritatis. Dolor dolorem eum,
            maiores maxime mollitia numquam quae recusandae voluptatem. Aliquam asperiores at, consequatur cumque dicta
            dolor dolore eius, eos eveniet excepturi iste libero maiores minus molestias nam nostrum officiis porro
            recusandae sequi sint. A accusantium adipisci aliquam amet beatae culpa cupiditate delectus dicta, eligendi
            enim ex exercitationem harum impedit inventore ipsam itaque laudantium libero minus porro possimus
            praesentium
            quas ratione rem sit suscipit tempore velit vero. Aliquid animi architecto beatae, corporis dicta doloribus
            eius eum illum itaque laboriosam magni maxime minus non nostrum qui quis ratione sit ut veritatis, voluptas.
            Architecto asperiores aspernatur dicta facilis fugit nostrum quibusdam sunt. Alias asperiores culpa libero
            obcaecati odit quasi suscipit! Consequatur cupiditate enim facilis illum maiores natus optio ratione
            tempora.
            Doloremque eveniet minus nam necessitatibus repudiandae veritatis, vitae? Dicta eos eveniet laboriosam
            pariatur quia. Ab dolorem placeat quae. Commodi earum esse et facilis, fugit laborum laudantium maiores,
            nobis
            odit quae, quibusdam sunt tempore voluptates? Accusantium aperiam beatae, consequuntur cum dicta dolores
            doloribus eligendi error excepturi facilis id illum incidunt ipsam laborum laudantium, minima minus modi
            molestiae molestias nemo nesciunt non nulla odio odit officiis quae qui quis quo reiciendis rerum sapiente
            sed
            soluta tenetur ullam unde veritatis voluptatum! Animi architecto atque cum cupiditate dolores, enim ex illo
            libero maiores mollitia necessitatibus nihil nulla quaerat quis rem tempora voluptates. At, culpa quibusdam.
            Alias amet asperiores deleniti doloremque dolorum est harum illum iusto laboriosam minus natus nisi nulla
            odit
            provident, reiciendis rem rerum sed sit velit voluptate. Beatae dolorem eaque eum eveniet impedit ipsum
            nobis
            perferendis, quisquam, recusandae repellat sed veniam voluptates voluptatibus. Adipisci deleniti dolores
            impedit ipsa odit quasi rerum? Ab aliquam aliquid cum dicta eligendi, fugit in laboriosam magnam natus, nisi
            omnis perspiciatis quaerat quasi repellendus sequi tempora voluptatem? Aperiam aut, doloremque doloribus
            explicabo illum inventore labore non odio officia optio perspiciatis porro quasi quisquam. Ad assumenda
            deleniti eaque, enim esse est hic illo possimus. Aperiam distinctio eaque eius id illum in magni mollitia
            quisquam sint vitae. Ab alias dignissimos distinctio dolore, excepturi facere fuga inventore ipsam mollitia
            nesciunt nihil nostrum, odio quasi quis quisquam reiciendis sit! Aut dicta enim numquam quis quod rem saepe
            vel voluptates. Alias aliquid dicta, dignissimos distinctio eaque eum harum id iure nesciunt nobis optio
            quasi
            quisquam reiciendis sapiente sed sequi similique voluptas voluptatibus. Corporis dolores ea enim libero modi
            nesciunt non obcaecati, quod, rerum sed tempora, ut? Accusamus aliquid assumenda consequatur cum dignissimos
            dolorem libero molestiae neque nostrum quos, repudiandae sequi sunt unde veritatis voluptates! Maxime,
            recusandae totam. Accusantium animi doloremque doloribus earum eos expedita iusto tempore velit veritatis?
            Ab
            ad, aliquid amet cupiditate dicta dignissimos dolor eaque esse fugit in incidunt, ipsa ipsam minima minus
            nobis officia officiis omnis quam quibusdam quidem soluta suscipit tempore temporibus tenetur totam unde,
            voluptate voluptatem? Accusamus accusantium, aperiam assumenda atque autem beatae blanditiis debitis dicta,
            dolorem earum eius eligendi esse facilis fugit incidunt iste laboriosam maiores mollitia nesciunt odit
            officia
            omnis optio quae quam quasi rem repellendus repudiandae rerum sed soluta suscipit totam veniam voluptatum.
            Assumenda consequatur consequuntur cum dolorem ducimus ea eaque eos est eveniet harum illo in maiores,
            mollitia nam natus nihil, officia praesentium, quas quidem quos rem repellendus rerum temporibus vero vitae.
            Accusantium architecto consequuntur culpa delectus eius eligendi enim error est et hic ipsam laudantium
            maiores minus modi molestias necessitatibus neque non numquam omnis porro possimus quam, quasi quia quidem
            quis quisquam quod repellendus repudiandae sint sit tempora vitae voluptas voluptatem! Ab accusantium atque
            aut consequatur deleniti dolore doloribus eaque eum eveniet facere fugiat hic, ipsa itaque minima nesciunt
            nobis nulla odit optio pariatur quae reiciendis repellat sint sunt tempora tempore velit vero voluptates.
            Consectetur dolor, eos eum inventore libero modi quaerat tenetur! Accusamus amet commodi ducimus ea enim eum
            facilis harum illo iste maxime minima molestias nulla quasi saepe similique, temporibus tenetur, vel.sint. A
            accusantium adipisci aliquam amet beatae culpa cupiditate delectus dicta, eligendi enim ex exercitationem
            harum impedit inventore ipsam itaque laudantium libero minus porro possimus praesentium quas ratione rem sit
            suscipit tempore velit vero. Aliquid animi architecto beatae, corporis dicta doloribus eius eum illum itaque
            laboriosam magni maxime minus non nostrum qui quis ratione sit ut veritatis, voluptas. Architecto asperiores
            aspernatur dicta facilis fugit nostrum quibusdam sunt. Alias asperiores culpa libero obcaecati odit quasi
            suscipit! Consequatur cupiditate enim facilis illum maiores natus optio ratione tempora. Doloremque eveniet
            minus nam necessitatibus repudiandae veritatis, vitae? Dicta eos eveniet laboriosam pariatur quia. Ab
            dolorem
            placeat quae. Commodi earum esse et facilis, fugit laborum laudantium maiores, nobis odit quae, quibusdam
            sunt
            tempore voluptates? Accusantium aperiam beatae, consequuntur cum dicta dolores doloribus eligendi error
            excepturi facilis id illum incidunt ipsam laborum laudantium, minima minus modi molestiae molestias nemo
            nesciunt non nulla odio odit officiis quae qui quis quo reiciendis rerum sapiente sed soluta tenetur ullam
            unde veritatis voluptatum! Animi architecto atque cum cupiditate dolores, enim ex illo libero maiores
            mollitia
            necessitatibus nihil nulla quaerat quis rem tempora voluptates. At, culpa quibusdam. Alias amet asperiores
            deleniti doloremque dolorum est harum illum iusto laboriosam minus natus nisi nulla odit provident,
            reiciendis
            rem rerum sed sit velit voluptate. Beatae dolorem eaque eum eveniet impedit ipsum nobis perferendis,
            quisquam,
            recusandae repellat sed veniam voluptates voluptatibus. Adipisci deleniti dolores impedit ipsa odit quasi
            rerum? Ab aliquam aliquid cum dicta eligendi, fugit in laboriosam magnam natus, nisi omnis perspiciatis
            quaerat quasi repellendus sequi tempora voluptatem? Aperiam aut, doloremque doloribus explicabo illum
            inventore labore non odio officia optio perspiciatis porro quasi quisquam. Ad assumenda deleniti eaque, enim
            esse est hic illo possimus. Aperiam distinctio eaque eius id illum in magni mollitia quisquam sint vitae. Ab
            alias dignissimos distinctio dolore, excepturi facere fuga inventore ipsam mollitia nesciunt nihil nostrum,
            odio quasi quis quisquam reiciendis sit! Aut dicta enim numquam quis quod rem saepe vel voluptates. Alias
            aliquid dicta, dignissimos distinctio eaque eum harum id iure nesciunt nobis optio quasi quisquam reiciendis
            sapiente sed sequi similique voluptas voluptatibus. Corporis dolores ea enim libero modi nesciunt non
            obcaecati, quod, rerum sed tempora, ut? Accusamus aliquid assumenda consequatur cum dignissimos dolorem
            libero
            molestiae neque nostrum quos, repudiandae sequi sunt unde veritatis voluptates! Maxime, recusandae totam.
            Accusantium animi doloremque doloribus earum eos expedita iusto tempore velit veritatis? Ab ad, aliquid amet
            cupiditate dicta dignissimos dolor eaque esse fugit in incidunt, ipsa ipsam minima minus nobis officia
            officiis omnis quam quibusdam quidem soluta suscipit tempore temporibus tenetur totam unde, voluptate
            voluptatem? Accusamus accusantium, aperiam assumenda atque autem beatae blanditiis debitis dicta, dolorem
            earum eius eligendi esse facilis fugit incidunt iste laboriosam maiores mollitia nesciunt odit officia omnis
            optio quae quam quasi rem repellendus repudiandae rerum sed soluta suscipit totam veniam voluptatum.
            Assumenda
            consequatur consequuntur cum dolorem ducimus ea eaque eos est eveniet harum illo in maiores, mollitia nam
            natus nihil, officia praesentium, quas quidem quos rem repellendus rerum temporibus vero vitae. Accusantium
            architecto consequuntur culpa delectus eius eligendi enim error est et hic ipsam laudantium maiores minus
            modi
            molestias necessitatibus neque non numquam omnis porro possimus quam, quasi quia quidem quis quisquam quod
            repellendus repudiandae sint sit tempora vitae voluptas voluptatem! Ab accusantium atque aut consequatur
            deleniti dolore doloribus eaque eum eveniet facere fugiat hic, ipsa itaque minima nesciunt nobis nulla odit
            optio pariatur quae reiciendis repellat sint sunt tempora tempore velit vero voluptates. Consectetur dolor,
            eos eum inventore libero modi quaerat tenetur! Accusamus amet commodi ducimus ea enim eum facilis harum illo
            iste maxime minima molestias nulla quasi saepe similique, temporibus tenetur, vel.
          </div>
        </div>
      </div>
    </>
  )
}

export default LkRequestsPage;