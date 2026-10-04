import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
  id: string;
  title: string;
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  const data = await res.json();
  // console.log(data);

  const headlines: Headlines[] = data.data;
  // console.log(headlines);

  return (
    <div className="bg-red-700 text-white">
      <div className="flex max-w-7xl mx-auto">
        <div className="bg-red-800 text-white text-sm leading-5 font-bold py-2 px-4">
          সর্বশেষ
        </div>

        <MarqueeText
          className="py-2"
          direction="right"
          duration={30}
          pauseOnHover={true}
        >
          {headlines.map((h) => (
            <span key={h.id}>
              <span className="text-sm leading-5">{h.title}</span>
              <span className="mx-5 inline-block h-1.5 w-1.5 rounded-full bg-neutral-500 align-middle" />
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
