"use server";

import supabase from "./supabase";

import { getBookings } from "./data-service.js";
import { auth, signIn, signOut } from "./auth.js";
import { revalidatePath } from "next/cache.js";
import { redirect } from "next/navigation";

// authorization
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// create booking

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

// update booking

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // authentication

  const session = await auth();
  if (!session) throw new Error("You must be logge in");

  // authorization

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingsId = guestBookings.map((booking) => booking.id);

  if (!guestBookingsId.includes(bookingId))
    throw new Error("you are not allowed to update this booking");

  // builidng update data;

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // mutation

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // Error handling

  if (error) throw new Error("Booking could not be updated");

  // revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // redirecting
  redirect("/account/reservations");
}

// delete booking
export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  // this is to make sure you can only delete your id
  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("you are not allowed to delete this booking");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("booking could not be deleted");
  revalidatePath("/account/reservations");
}

// update guest;

export async function updateGuest(formData) {
  // authenticate
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  // get national id
  const nationalID = formData.get("nationalId");

  // get nationality and country flag
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // check national Id validity
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national Id");

  // data update
  const updateData = { nationality, countryFlag, nationalID };

  // update data

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  // handle error

  if (error) throw new Error("Guest could not be udpated");
  // revalidates
  revalidatePath("/account/profile");
}
