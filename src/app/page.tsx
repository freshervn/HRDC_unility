import Link from "next/link";

<link rel="icon" href="/favicon.ico" sizes="any" />;
export default function Home() {
  return (
    <>
      <nav className="flex items-center flex-wrap bg-green-300 p-3 ">
        <Link href="/workflow" className="inline-flex items-center p-2 mr-4 ">
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            Workflow vanila Javascript
          </span>
        </Link>
      </nav>
      <nav className="flex items-center flex-wrap bg-blue-300 p-3 ">
        <Link href="/org_chart" className="inline-flex items-center p-2 mr-4 ">
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            Orgchart (ReactFlow)
          </span>
        </Link>
      </nav>
      <nav className="flex items-center flex-wrap bg-red-300 p-3 ">
        <Link href="/flowTest" className="inline-flex items-center p-2 mr-4 ">
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            Workflow (ReactFlow)
          </span>
        </Link>
      </nav>
    </>
  );
}
