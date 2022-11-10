import { start } from "repl";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  getEvent: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.event.findUnique({
        where: {
          id: input.id,
        },
      });
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
