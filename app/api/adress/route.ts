import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();

// NAČTENÍ ADRES (GET)
export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Neautorizováno" }, { status: 401 });

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: { id: 'desc' }
  });

  return NextResponse.json(addresses);
}

// PŘIDÁNÍ ADRESY (POST)
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Neautorizováno" }, { status: 401 });

    const body = await req.json();
    const { street, city, zipCode } = body;

      if (!street || !city || !zipCode) {
          return NextResponse.json({ error: "Vyplňte všechna pole" }, { status: 400 });
      }

      // jednoduchá validace PSČ (12345 nebo 123 45)
      const zipRegex = /^\d{3}\s?\d{2}$/
      if (!zipRegex.test(String(zipCode))) {
        return NextResponse.json({ error: "Neplatné PSČ (očekává se 5 číslic, např. 12345 nebo 123 45)" }, { status: 400 })
      }

      const normalizedZip = String(zipCode).replace(/\s+/g, "")

    const newAddress = await prisma.address.create({
      data: {
        userId: session.user.id,
        street,
        city,
        zipCode: normalizedZip,
        country: "Česká republika"
      }
    });

    return NextResponse.json(newAddress);
  } catch (error) {
    return NextResponse.json({ error: "Chyba serveru" }, { status: 500 });
  }
}

// SMAZÁNÍ ADRESY (DELETE)
export async function DELETE(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Neautorizováno" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if(!id) return NextResponse.json({ error: "Chybí ID" }, { status: 400 });

    await prisma.address.deleteMany({
        where: {
            id: id,
            userId: session.user.id // Bezpečnost: mazat jen svoje
        }
    });

    return NextResponse.json({ success: true });
}

// AKTUALIZACE ADRESY (PUT)
export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Neautorizováno" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Chybí ID" }, { status: 400 });

    const body = await req.json();
    const { street, city, zipCode } = body;

    if (!street || !city || !zipCode) {
      return NextResponse.json({ error: "Vyplňte všechna pole" }, { status: 400 });
    }

    const zipRegex = /^\d{3}\s?\d{2}$/
    if (!zipRegex.test(String(zipCode))) {
      return NextResponse.json({ error: "Neplatné PSČ (očekává se 5 číslic, např. 12345 nebo 123 45)" }, { status: 400 })
    }

    const normalizedZip = String(zipCode).replace(/\s+/g, "")

    const updated = await prisma.address.updateMany({
      where: { id: id, userId: session.user.id },
      data: { street, city, zipCode: normalizedZip }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Chyba serveru" }, { status: 500 });
  }
}