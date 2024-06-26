import Navbar from "@/components/Navbar"

const PublicLayout = ({
  children
}) => {
  return <>
    <Navbar />
    <main className="min-h-screen mb-2">
      {children}
    </main>
    <div className="w-screen h-12 border-t flex items-center justify-center text-xs font-medium">
      <span className="opacity-60">
        © COPYRIGHT 2022 ALL RIGHTS RESERVED BY ATHENS GRUOPS
      </span>
    </div>
  </>
}

export default PublicLayout