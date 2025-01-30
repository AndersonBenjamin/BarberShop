"use client";

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {
    return (
        <Card>
            <CardContent className="px-5 py-8 justify-between flex flex-row">
                <Image src="/Logo.pnG" alt="Barber" height={22} width={130} />

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="h-6 w-6">
                            <MenuIcon size={16}></MenuIcon>
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu></SideMenu>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;