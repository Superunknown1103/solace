import { PgSelect, PgSelectBase } from "drizzle-orm/pg-core";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, sql } from "drizzle-orm/sql";

// backend optimization ideas
// introduce pagination
// perform backend search instead of front end 
// potential for caching 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const search = searchParams.get("search") ?? "";
  const offset = (page - 1) * limit;

  const searchableColumns = [advocates.firstName, advocates.lastName, advocates.city, advocates.degree];
  const conditions = searchableColumns.map((col) => ilike(col, `%${search}%`));

  // first query for data
  let dataQuery = db.select().from(advocates).$dynamic();
  dataQuery = search && searchableColumns.length > 0 ? dataQuery.where(() => or(...conditions)) : dataQuery
  dataQuery = dataQuery.limit(limit).offset(offset);
  const data = await dataQuery;

  // second query for count
  let countQuery = db.select({ count: sql`count(*)`.mapWith(Number).as("count") }).from(advocates).$dynamic();
  countQuery = search && searchableColumns.length > 0 ? countQuery.where(() => or(...conditions)) : countQuery
  const countData = await countQuery;
  const total = countData[0].count

  return Response.json({ data, pagination: { page, limit, offset, total, totalPages: Math.ceil(total / limit), }, });
}