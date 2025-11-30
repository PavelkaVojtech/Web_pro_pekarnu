import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Import ze serverové knihovny
import { headers } from "next/headers";
import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    // 1. Ověření přihlášení
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Neautorizovaný přístup" }, { status: 401 });
    }

    // 2. Získání dat z formuláře
    const body = await req.json();
    const { name, phone, isCompany, companyName, ico, dic } = body;

    // 3. Update v databázi
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone,
        // Pokud není firma, uložíme null, jinak hodnoty
        companyName: isCompany ? companyName : null,
        ico: isCompany ? ico : null,
        dic: isCompany ? dic : null,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Chyba při aktualizaci profilu:", error);
    return NextResponse.json({ error: "Chyba serveru" }, { status: 500 });
  }
}