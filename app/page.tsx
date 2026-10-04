import { redirect } from "next/navigation";
// import type { Metadata } from "next";
// import InvitationLanding from "./InvitationLanding";

// export const metadata: Metadata = {
//   title: "You're invited — #moFeranAde’26",
//   description:
//     "You are invited to the wedding of Soje Anuoluwapo Feranmi & Emmanuel Segun Ademola.",
// };

export default function Home() {
  // return <InvitationLanding />;
  redirect("/celebration");
}
