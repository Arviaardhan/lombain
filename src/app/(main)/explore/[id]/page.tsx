import RecruitmentDetail from "@/pages/RecruitmentDetail";

export default function IdPage({ params }: { params: { id: string } }) {
  return (
    <>
      <RecruitmentDetail id={params.id} />
    </>
  );
}
