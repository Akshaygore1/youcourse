import Mycources from "@/app/_component/Mycources";
import { getVideoInfo } from "@/app/utils";
import { VideoData } from "@/types";

async function getDuration(videoId: string): Promise<number> {
  const res = await fetch(
    `https://yt.lemnoslife.com/videos?part=contentDetails&id=${videoId}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.items[0]?.contentDetails?.duration || 0;
}

export default async function MyCoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const data: VideoData = await getVideoInfo(params.slug);
  const duration = await getDuration(params.slug);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Mycources data={data} duration={duration} videoId={params.slug} />
    </div>
  );
}
