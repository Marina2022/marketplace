import s from './About.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {BASE_URL} from "@/consts/baseURL.js";
import Description from "@/components/ProductPage/DetailedInfo/tabsContent/About/Description/Description.jsx";
import AboutDetails from "@/components/ProductPage/DetailedInfo/tabsContent/About/AboutDetails/AboutDetails.jsx";

const About = ({product}) => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [company, setCompany] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      setError(false)

      try {

        const productResponse = await axiosInstance(`companies/${product.companyId}/about`)
        if (productResponse.status === 200) {
          setCompany(productResponse.data)
        } else throw new Error('response status not equal 200')
      } catch (err) {
        console.log('err = ', err)
        setError('Произошла ошибка')
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, []);

  if (isLoading) return <Spinner className={s.spinner}/>
  if (error) return <div className={s.noReviews}>{error}</div>

  return (
    <div className={s.about}>
      <h2 className={s.title}>О компании</h2>
      <div className={s.topBlock}>
        {
          company.galery.length > 0 &&
          <div className={s.imgWrapper}>
            <img 
              className={s.profileImage} 
              // src={`${BASE_URL}${company.galery[1].images[0].imageUrl}`}
              src={company.galery[1].images[0].imageUrl}
              alt={company.galery[1].images[0].imageName}
            />
          </div>
        }


        <AboutDetails company={company}/>
      </div>
      <Description text={company.companyDescription} images={company.galery[0]?.images}/>

      {
        company.galery.length > 0 &&

        <>
          <h3 className={s.certTitle}>Сертификаты</h3>
          <ul className={s.certList}>
            {
              company.galery[2].images.map((img, i) => <img
                key={i}
                className={s.certImg}
                // src={`${BASE_URL}${img.imageUrl}`}
                src={img.imageUrl}
                alt={img.imageName}/>)
            }
          </ul>
        </>
      }
    </div>
  );
};

export default About;