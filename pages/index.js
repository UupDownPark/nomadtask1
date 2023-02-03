import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [rich, setRich] = useState([]);
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch(`https://billions-api.nomadcoders.workers.dev/`)
      ).json();

      setRich(results);
    })();
  }, []);
  const router = useRouter();
  const onClick = (id) => {
    router.push(`person/${id}`);
  };
  console.log(rich);
  return (
    <div className="container">
      {rich?.map((people) => (
        <div className="people" key={people.id}>
          <img src={people.squareImage} onClick={() => onClick(people.id)} />
          <div className="name" onClick={() => onClick(people.id)}>
            {people.name}
          </div>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          padding: 20px;
          gap: 20px;
          background: gray;
        }
        .name {
          text-align: center;
        }
        .people img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.4s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .people:hover img {
          transform: scale(1.02) translateY(-10px);
        }
      `}</style>
    </div>
  );
}
