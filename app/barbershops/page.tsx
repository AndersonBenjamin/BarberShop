import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}


const BarbershopsPage = async ({ searchParams }: { searchParams: Promise<BarbershopsPageProps['searchParams']> }) => {
  const { search } = await searchParams; // Aguarda a resolução de `params`
  console.log('Chegou em barbershops')
  if (!search) {
    return redirect("/");
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search
          defaultValues={{
            search: search,
          }}
        />

        <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{search}&quot;</h1>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopsPage;
