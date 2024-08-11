"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationProps } from "@/types";

const PaginationTable = ({ totalPages, currentPage }: PaginationProps) => {
  const pages = Array.from(
    { length: totalPages || 0 },
    (_, index) => index + 1,
  );

  return (
    <>
      <Pagination className="justify-end py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="" />
          </PaginationItem>
          {pages.map((page) => {
            return (
              <PaginationItem key={page}>
                <PaginationLink href={`?page=${page}`}>{page}</PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext href="" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationTable;
