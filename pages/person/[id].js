import { useEffect, useState } from "react";

export default function Sangha({ id }) {
  const [information, setInformation] = useState([]);
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
      ).json();

      setInformation([results]);
    })();
  }, []);
  console.log(information);
  return (
    <div className="container">
      <img src={information[0]?.thumbnail || information[0]?.squareImage} />
      <h1>{information[0]?.id}</h1>
      <div>{information[0]?.netWorth}</div>
      <div>{information[0]?.industries[0]}</div>
      <div>{information[0]?.about}</div>
      <div>{information[0]?.bio}</div>
      <div className="container2">
        <h1>Financial Assets</h1>
        {information[0]?.financialAssets.map((money, idx) => (
          <div key={idx} className="box">
            <div>{money.ticker}</div>
            <div>{money.sharePrice}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          background: white;
          margin: 30px;
        }
        .container img {
          margin: 50px;
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .box {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          background: gray;
          margin: 2px;
        }
      `}</style>
    </div>
  );
}
export function getServerSideProps({ params: { id } }) {
  return {
    props: { id },
  };
}
