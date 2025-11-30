import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
// OPRAVA IMPORTU
import { PrismaClient } from "@/lib/generated/prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const profileSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  phone: z.string().optional().or(z.literal("")),
  isCompany: z.boolean(),
  companyName: z.string().optional().or(z.literal("")),
  ico: z.string().optional().or(z.literal("")),
  dic: z.string().optional().or(z.literal("")),
}).refine((data) => {
  if (data.isCompany) {
    return !!data.companyName && !!data.ico;
  }
  return true;
}, {
  message: "Pro firemní účet je nutné vyplnit Název firmy a IČO",
  path: ["companyName"],
});

export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Neautorizovaný přístup" }, { status: 401 });
    }

    const body = await req.json();
    const parseResult = profileSchema.safeParse(body);

    if (!parseResult.success) {
        // OPRAVA: .issues místo .errors
        return NextResponse.json({ error: parseResult.error.issues[0].message }, { status: 400 });
    }

    const { name, phone, isCompany, companyName, ico, dic } = parseResult.data;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone,
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