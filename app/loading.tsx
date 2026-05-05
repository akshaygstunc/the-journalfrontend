// export default function Loading() {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#861212] border-t-transparent"></div>
//     </div>
//   );
// }


import Container from "@/src/components/layout/Container";
import { HomePageSkeleton } from "@/src/components/Skeleton";
 
export default function Loading() {
  return (
    <Container>
      <HomePageSkeleton />
    </Container>
  );
}