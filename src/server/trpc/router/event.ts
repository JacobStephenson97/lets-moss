import { start } from "repl";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  eventCreate: publicProcedure
    .input(
      z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);
      return ctx.prisma.event.create({
        data: {
          endDate: endDate,
          startDate: startDate,
          title: input.title,
          location: "todo",
        },
      });
    }),
});
