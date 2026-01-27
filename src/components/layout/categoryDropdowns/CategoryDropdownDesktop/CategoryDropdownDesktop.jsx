import s from './CategoryDropdownDesktop.module.scss';
import {useState} from "react";

const CategoryDropdownDesktop = ({setCategoryDropdownOpen}) => {

  const [catalogType, setCatalogType] = useState('products')  // products/requests
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)

  const handleTriggerClick = () => {
    setTypeDropdownOpen(true)
  }

  const dropdownArray = [
    {label: "Каталог товаров", value: "products"},
    {label: "Каталог заявок", value: "requests"},
  ]

  return (
    <div className={s.categoryDropdown}>
      <div className="container">
        <div className={s.globalWrapper}>
          <div className={s.leftPart}>

            <div className={s.dropdownWrapper}>

              <div className={s.trigger} onClick={handleTriggerClick}>
                <span>
                  {
                    catalogType === 'products' ? 'Каталог товаров' : 'Каталог заявок'
                  }
                </span>
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.77833 5.73167C5.31167 5.73167 4.845 5.55167 4.49167 5.19833L0.145 0.851666C-0.0483333 0.658333 -0.0483333 0.338333 0.145 0.145C0.338333 -0.0483333 0.658333 -0.0483333 0.851667 0.145L5.19833 4.49167C5.51833 4.81167 6.03833 4.81167 6.35833 4.49167L10.705 0.145C10.8983 -0.0483333 11.2183 -0.0483333 11.4117 0.145C11.605 0.338333 11.605 0.658333 11.4117 0.851666L7.065 5.19833C6.71167 5.55167 6.245 5.73167 5.77833 5.73167Z"
                    fill="#658092"/>
                </svg>
              </div>

              {
                typeDropdownOpen && (
                  <div className={s.typeDropdown}>


                    <button className={s.svgUpBtn} onClick={() => setTypeDropdownOpen(false)}>
                      <svg  width="12" height="6"
                           viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.77831 0.000755775C6.24497 0.000755775 6.71164 0.180755 7.06497 0.534088L11.4116 4.88076C11.605 5.07409 11.605 5.39409 11.4116 5.58742C11.2183 5.78076 10.8983 5.78076 10.705 5.58742L6.35831 1.24076C6.03831 0.920755 5.51831 0.920755 5.19831 1.24076L0.851641 5.58742C0.658308 5.78076 0.338307 5.78076 0.144973 5.58742C-0.0483599 5.39409 -0.0483599 5.07409 0.144973 4.88076L4.49164 0.534088C4.84497 0.180755 5.31164 0.000755775 5.77831 0.000755775Z"
                          fill="#658092"/>
                      </svg>
                    </button>

                    {
                      dropdownArray.map((item, i) => {


                        const handleItemClick = (item) => {
                          setCatalogType(item.value)
                          setTypeDropdownOpen(false)
                        }

                        return (
                          <div key={i} className={s.typeDropdownItem} onClick={() => handleItemClick(item)}>
                            {item.label}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }


            </div>

            <div>

              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur fuga fugiat maiores molestias
              perspiciatis quas. Aliquam animi blanditiis consequuntur, deleniti deserunt dolores ducimus eius hic ipsam
              minus nam nisi non pariatur perspiciatis quam quasi quisquam quod sapiente unde velit? Aspernatur beatae
              corporis debitis delectus dolorem doloremque dolorum error facere facilis harum illo in, incidunt ipsam
              iste necessitatibus neque nesciunt, omnis, placeat praesentium quas quia ratione repellat rerum tenetur
              ullam ut voluptas voluptate! Doloremque harum inventore minima mollitia nemo quia quisquam repellat sequi
              veritatis voluptatibus. Assumenda earum error ex incidunt laudantium libero magnam quaerat velit? Ab amet
              animi aspernatur aut consectetur corporis culpa cum cupiditate dicta dolore doloremque dolores ea, eos est
              ex expedita fugiat harum hic inventore iusto minus modi natus nesciunt numquam praesentium quidem quis
              quisquam quod repellat rerum sequi vitae voluptas voluptate! Aperiam delectus doloremque hic labore modi
              nobis odio perspiciatis porro reprehenderit velit. Corporis cum dicta distinctio dolor dolorem eaque eius
              eligendi et ex excepturi id inventore, praesentium quaerat. A exercitationem quibusdam saepe. Amet animi
              aut blanditiis, doloribus ea expedita impedit libero molestiae, quae quas quia quis reiciendis repellat!
              Aperiam corporis cupiditate deserunt dolorem doloribus earum eius esse est et fugiat harum illum iure
              iusto laborum maxime minus porro quasi, quidem quis repellat saepe sed sunt tenetur totam velit! Ad alias
              atque autem beatae cum cumque debitis dolor dolorem ea eaque earum exercitationem fuga harum impedit
              incidunt iste laudantium modi molestias nam, omnis praesentium quae quod similique sint soluta ullam vel
              voluptatibus! Asperiores, eligendi laborum necessitatibus nobis numquam perferendis praesentium provident
              quibusdam quod, sed, sequi unde voluptatibus. Architecto debitis distinctio dolor doloremque earum
              excepturi, explicabo hic laudantium molestiae necessitatibus nemo neque quis sapiente sequi unde ut
              veritatis vero. Accusamus amet animi aperiam dolor eos fuga id illum perferendis, sunt. Aperiam asperiores
              deleniti dignissimos, distinctio earum excepturi explicabo ipsam nihil nisi nostrum perferendis,
              perspiciatis quas quasi qui quo sequi similique unde velit voluptatem voluptatibus. A ab alias aliquam
              amet animi aut corporis distinctio dolor dolorem doloremque doloribus error eum facilis fugiat inventore
              ipsum itaque numquam obcaecati officiis pariatur perspiciatis ratione repellat rerum sunt suscipit tempora
              tenetur unde, veniam voluptatem voluptates? Facilis nemo nobis placeat quae totam. Accusamus aperiam
              architecto autem commodi, debitis ducimus eaque est, fugiat hic iure molestias perferendis porro provident
              quae quia, quibusdam quo quos ullam veniam voluptatum. Animi asperiores dolores dolorum sit tenetur! At
              atque cumque labore, laboriosam officia quos tempore ullam! Amet assumenda aut autem culpa distinctio
              dolor dolores eligendi enim eos error esse est excepturi facilis fuga harum hic impedit laudantium, maxime
              minima mollitia nobis odio odit officia omnis pariatur possimus quae quam quidem quo quod, recusandae
              reiciendis sequi tenetur ullam ut vitae voluptatem. Aliquid est eveniet facilis illo illum inventore magni
              neque nisi nostrum officia, perspiciatis quasi sapiente sed sequi totam, veritatis vitae voluptas!
              Accusantium, aliquam aspernatur assumenda cupiditate delectus, dolores eligendi esse harum nemo obcaecati
              porro quis repellat reprehenderit sed, sint? A alias aliquam amet aperiam aspernatur assumenda
              consequuntur deserunt dicta, dolore ducimus eligendi esse eveniet fuga id inventore ipsum itaque magnam
              maiores nobis non perferendis quam quas ratione recusandae rerum vero voluptatum. Adipisci aliquam
              consectetur debitis distinctio eius eum explicabo fugiat illo in ipsa iste iusto labore libero molestias,
              nemo non officia praesentium quasi qui, quo ratione reiciendis, sint suscipit totam ullam vel veniam
              voluptatum. A asperiores, atque aut cum dolore dolorum enim eveniet exercitationem id incidunt itaque
              labore laborum maiores minus nostrum nulla, omnis placeat quas quia rem suscipit tenetur velit. Beatae in
              optio sint soluta, sunt temporibus. Dicta itaque, nisi? At eius illo ipsa laudantium quo saepe, sequi?
              Aliquam dolores nam tempore! Perspiciatis, placeat reiciendis. Consectetur consequatur cum delectus iusto
              non obcaecati officia quos, rem ullam. A alias aliquid beatae consequatur delectus dicta, dignissimos
              dolor dolorem dolores ea error, esse ex exercitationem illum incidunt inventore laboriosam magnam magni
              minus modi nemo neque nisi non numquam placeat provident quos ratione repudiandae similique tempore
              temporibus totam unde voluptatibus. A autem beatae commodi consectetur doloremque dolores ea esse ipsam
              numquam, omnis placeat quae quaerat quibusdam reiciendis temporibus. Ab alias blanditiis cumque debitis
              dolores ducimus eveniet exercitationem in laudantium, libero minima officia quae quis quisquam, rem. At
              aut beatae blanditiis consectetur consequatur dicta dignissimos dolorem doloremque doloribus et incidunt
              ipsam, ipsum iste maxime minus nihil nisi, placeat quaerat quia quisquam repudiandae sequi sit tempora
              tenetur totam. Consequuntur dignissimos illum itaque magni officiis provident quisquam saepe soluta
              suscipit veniam! Cum debitis deserunt dolorum modi molestias nobis porro, qui reprehenderit temporibus.
              Accusamus ad aliquid at aut consequatur distinctio doloremque earum eum, excepturi expedita fuga fugiat
              illum impedit iure labore modi molestias mollitia nesciunt nihil nulla perferendis provident quo quod
              reprehenderit soluta tenetur voluptate. Amet assumenda est illo itaque optio quae recusandae repudiandae.
              Atque aut commodi consequuntur doloremque est, expedita, facilis fuga ipsa iure laboriosam molestias
              officiis optio repellendus sapiente tenetur unde velit veniam vitae? Ad dolorum eligendi illum in
              obcaecati quibusdam repudiandae sequi sint totam unde! Aspernatur culpa facere fugiat illum impedit, ipsa,
              iste magni molestias nam nulla numquam officiis possimus reiciendis rerum, sequi. Aliquid assumenda, atque
              earum obcaecati possimus quos sequi veritatis? Alias, at beatae cumque earum harum impedit, in iusto non
              nostrum numquam perspiciatis, quae repellat saepe sunt totam! At dolorum enim inventore itaque libero
              quisquam voluptates! Accusamus aliquam animi architecto at cum dolorem doloremque doloribus eum eveniet,
              exercitationem facere ipsa ipsam itaque labore laudantium libero maxime mollitia numquam officia
              praesentium quas quasi quidem quis quod reiciendis reprehenderit saepe similique sit soluta tempora
              temporibus veniam voluptatem voluptatum! A ab aperiam architecto aspernatur eaque eligendi eum harum,
              ipsam ipsum iste laudantium molestias qui quis repellat reprehenderit repudiandae sunt velit. Ad assumenda
              atque beatae blanditiis culpa dicta eius, eligendi ex, facilis iure, iusto natus nobis perferendis placeat
              quaerat quos repellat repellendus voluptatibus? Alias eligendi et ex id natus nesciunt odit quae suscipit
              temporibus. Accusamus alias amet consectetur, corporis cum deserunt dicta dolores earum eligendi id
              impedit ipsum, necessitatibus omnis optio quisquam recusandae saepe totam, veniam. Animi, beatae commodi
              eaque est, harum magnam minima nostrum nulla obcaecati officia perferendis possimus provident quis
              tempora, vitae.
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CategoryDropdownDesktop;