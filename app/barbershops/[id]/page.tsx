import { db } from '@/app/_lib/prisma'
import BarbershopInfo from './_components/barbershop--info';
import ServiceItem from './_components/service-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';
interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    }
}

const BarberShopDetailsPage = async ({ params }: { params: Promise<BarbershopDetailsPageProps['params']> }) => {
    const { id } = await params; // Aguarda a resolução de `params`

    const session = await getServerSession(authOptions);

    if (!id) {
        // TODO redirecionar para a home page
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: { id },
        include: { services: true },
    });

    if (!barbershop) {
        // TODO redirecionar para a home page
        return null;
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <div className='px-5 flex flex-col gap-4 py-6'>
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} barberShop={barbershop} service={service} isAuthenticated={!!session?.user} />
                ))}
            </div>


        </div>
    );
};

export default BarberShopDetailsPage;