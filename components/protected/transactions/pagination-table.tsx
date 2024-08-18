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

const PaginationTable = ({
  totalPages = 0,
  currentPage = 1,
}: PaginationProps) => {
  const pages = Array.from(
    { length: totalPages || 0 },
    (_, index) => index + 1,
  );

  return (
    <>
      <Pagination className="justify-end py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? `?page=${currentPage - 1}` : ""}
              className={
                currentPage === 1 ? "cursor-not-allowed text-gray-400" : ""
              }
            />
          </PaginationItem>
          {pages.map((page) => {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`?page=${page}`}
                  className={
                    currentPage == page
                      ? "cursor-not-allowed text-gray-400"
                      : ""
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href={currentPage < totalPages ? `?page=${currentPage + 1}` : ""}
              className={
                currentPage === totalPages
                  ? "cursor-not-allowed text-gray-400"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationTable;
