import { useEffect, useState } from "react";

export default function Sangha({ id }) {
  const [information, setInformation] = useState([]);
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
      ).json();
      console.log(results);
      setInformation([results]);
    })();
  }, [id]);
  console.log(information);
  return (
    <div className="container">
      <img src={information[0].thumbnail} />
      <h1>{information[0].id}</h1>
      <div>{information[0].netWorth}</div>
      <div>{information[0].industries[0]}</div>
      <div>{information[0].about}</div>
      <div>{information[0].bio}</div>
    </div>
  );
}
export function getServerSideProps({ params: { id } }) {
  return {
    props: { id },
  };
}
