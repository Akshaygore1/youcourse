import { getPlaylistInfo } from "@/app/utils";

export default async function Page({ params }: { params: { slug: string } }) {
  // fetch playlist info using youtube api
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${params.slug}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
  console.log("----", url);
  const data = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await data.json();
  const playlist = json.items[0];
  console.log("JSON", playlist);
  // const playlistInfo = await getPlaylistInfo(params.slug);
  return <div>Playlist {params.slug}</div>;
}
