import s from './VideoMedia.module.scss';

const VideoMedia = ({tabCounts, fileUrlCache}) => {

  const handleDownloadAll = async () => {
    console.log("Получаем архив с api и скачиваем")
  }

  return (
    <div className={s.videoMedia}>

      <div className={s.header}>
        <div className={s.headerTitle}>Видео · {tabCounts?.videos}</div>
        {
          tabCounts?.videos > 0 && <button onClick={handleDownloadAll} className={s.downloadAllBtn}>Скачать все</button>
        }
      </div>

      <div className={`${s.videoList} scroll`}>
        VideoMedia

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur culpa dolor ea eum excepturi
        expedita illo illum iste labore minima numquam obcaecati perferendis, perspiciatis quis quod repellat rerum sunt
        suscipit voluptatem. Consectetur, corporis, tempore! Ab adipisci alias doloremque iste iusto natus quas quia
        suscipit ullam. Blanditiis doloremque ea eveniet quisquam reprehenderit. Accusantium aperiam aut, cumque dicta
        eaque eius est laudantium non nostrum rem sed tempora temporibus. Architecto ex exercitationem labore magni
        nostrum optio qui quisquam sunt ullam unde? Amet cupiditate ea necessitatibus nihil, quam quia quidem repellat
        reprehenderit rerum sequi. Accusantium aliquam architecto aspernatur aut, commodi cumque dolorem error et ex
        exercitationem ipsam ipsum iste maxime minima minus molestiae nobis, odio odit pariatur perferendis possimus
        quaerat quas quasi quisquam quod repellat reprehenderit similique temporibus tenetur voluptate. Ab ad animi
        aspernatur aut blanditiis corporis cumque ducimus esse ex expedita, explicabo facilis iste iure laboriosam
        laborum magni nesciunt non nostrum obcaecati qui quod rem, rerum saepe, soluta tenetur totam ullam voluptatibus.
        Autem cumque error ipsa ipsam, nam, obcaecati provident quo quos rerum suscipit tempore veritatis vero. A beatae
        culpa delectus ea facilis hic labore magni necessitatibus, neque nostrum quae reiciendis rem rerum sequi soluta
        tempora vel veniam. Amet animi autem consequuntur dolor eaque earum eius eveniet iure magnam minima minus modi,
        molestiae nam pariatur quae, quibusdam repellendus reprehenderit tempora tempore unde. Eaque esse ipsam
        molestias ratione vitae? Ad dolor dolore doloremque eos, est eveniet facilis, minus molestias nostrum
        perspiciatis quaerat quod recusandae rem reprehenderit suscipit tempore vel. Commodi exercitationem quis ullam.
        Aliquam deleniti dolore eaque, earum expedita fuga fugit in laudantium magnam molestiae nulla pariatur
        perferendis ratione, sunt temporibus. Aspernatur assumenda dolorem facere quae quis? Aliquam animi autem,
        consequuntur ducimus eaque impedit nam neque nobis quaerat quis quisquam reiciendis saepe sequi temporibus ut? A
        adipisci alias architecto asperiores corporis debitis deserunt dignissimos dolorem dolores doloribus enim hic
        ipsum itaque laborum maiores modi molestias mollitia nemo non officiis quam recusandae rem sequi, sit sunt
        suscipit vero. Amet animi aperiam architecto at atque commodi consequuntur, cum cupiditate deleniti deserunt
        dolor dolores doloribus eligendi enim esse est eum expedita, fuga itaque laboriosam necessitatibus obcaecati
        officiis placeat porro quaerat quibusdam quidem quis quisquam recusandae, repudiandae sapiente sint sunt tempora
        ullam velit vitae voluptates? Asperiores at earum excepturi inventore laborum nam neque sed? Consectetur cum
        cupiditate fuga harum numquam, placeat quis recusandae reiciendis sequi. Consectetur cum dolore enim facere,
        fugiat in nihil placeat quasi quidem totam. Dolorem laudantium natus nulla porro quidem reiciendis sunt
        voluptatem voluptates! Accusantium, ad architecto aspernatur at consectetur debitis dignissimos ducimus eaque
        eius eligendi eos et fugiat inventore ipsam iste labore magni minus nam natus non obcaecati optio quisquam quos
        reprehenderit sequi similique vero! Asperiores cumque, distinctio eos explicabo illum in nesciunt non officiis
        optio, pariatur quis reiciendis, rem reprehenderit unde voluptatem? Consequatur corporis, distinctio explicabo
        neque quasi sunt veniam. Ad adipisci aliquid doloribus ducimus fugit ipsa maxime necessitatibus nihil, quos
        recusandae repellat tempore. Beatae consequuntur esse explicabo, facilis harum labore magnam nihil recusandae
        tempore ullam? Aperiam eius minima pariatur repellendus repudiandae.

      </div>
    </div>
  )
}

export default VideoMedia;