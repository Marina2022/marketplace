import s from './RatingYellow.module.scss';

const RatingYellow = ({rating, gap=2}) => {  
  const arr = [1,1,1,1,1]
  return (   
   
    <div className={s.wrapper222} style={{gap: gap}}>
      {
        arr.map((item, i)=>{
          return rating >= i + 1 ?
            <svg key={i} width="10" height="10" viewBox="0 0 10 10"  fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.65165 0.927049C3.951 0.00573802 5.25441 0.00573897 5.55376 0.927049L5.94979 2.1459C6.08367 2.55792 6.46762 2.83688 6.90085 2.83688H8.18242C9.15115 2.83688 9.55392 4.0765 8.77021 4.6459L7.73339 5.39919C7.38291 5.65383 7.23625 6.1052 7.37012 6.51722L7.76615 7.73607C8.0655 8.65738 7.01102 9.4235 6.22731 8.8541L5.19049 8.10081C4.84001 7.84617 4.36541 7.84617 4.01492 8.10081L2.97811 8.8541C2.19439 9.4235 1.13992 8.65738 1.43927 7.73607L1.8353 6.51722C1.96917 6.1052 1.82251 5.65383 1.47202 5.39919L0.435209 4.6459C-0.348504 4.0765 0.0542717 2.83688 1.02299 2.83688H2.30457C2.73779 2.83688 3.12175 2.55792 3.25562 2.1459L3.65165 0.927049Z"
                fill="#FFBF6A"/>
            </svg>

            : <svg key={i} width="10" height="10" viewBox="-1 -1 11 11" fill="none" stroke="#FFBF6A" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.65165 0.927049C3.951 0.00573802 5.25441 0.00573897 5.55376 0.927049L5.94979 2.1459C6.08367 2.55792 6.46762 2.83688 6.90085 2.83688H8.18242C9.15115 2.83688 9.55392 4.0765 8.77021 4.6459L7.73339 5.39919C7.38291 5.65383 7.23625 6.1052 7.37012 6.51722L7.76615 7.73607C8.0655 8.65738 7.01102 9.4235 6.22731 8.8541L5.19049 8.10081C4.84001 7.84617 4.36541 7.84617 4.01492 8.10081L2.97811 8.8541C2.19439 9.4235 1.13992 8.65738 1.43927 7.73607L1.8353 6.51722C1.96917 6.1052 1.82251 5.65383 1.47202 5.39919L0.435209 4.6459C-0.348504 4.0765 0.0542717 2.83688 1.02299 2.83688H2.30457C2.73779 2.83688 3.12175 2.55792 3.25562 2.1459L3.65165 0.927049Z"
                />
            </svg>          
        })
      }
    </div>
  );
};

export default RatingYellow;