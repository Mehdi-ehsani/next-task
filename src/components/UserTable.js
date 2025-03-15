"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { selectUser } from "../core/features/userSlice";
import SearchUser from "./SearchUser";

const UserTable = ({ usersData, totalPages, currentPage }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const updatePage = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage);
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSearch = (query) => {
        const params = new URLSearchParams(searchParams);
        params.set("search", query);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    const sortedUsers = useMemo(() => {
        let sorted = [...usersData];
        if (sortField) {
            sorted.sort((a, b) => {
                if (sortField === "id") {
                    return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
                }
                return sortOrder === "asc"
                    ? a[sortField].localeCompare(b[sortField])
                    : b[sortField].localeCompare(a[sortField]);
            });
        }
        return sorted;
    }, [sortField, sortOrder, usersData]);

    
    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 items-center justify-center w-full min-h-svh">
            <div className="w-full px-4 max-w-[1000px] sm:flex-row flex flex-col-reverse gap-2 items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="dark:text-slate-400">Sort By :</h1>
                    <button className="btn btn-soft btn-info h-7" onClick={() => handleSort("id")}>Id</button>
                    <button className="btn btn-soft btn-info h-7" onClick={() => handleSort("name")}>Name</button>
                    <button className="btn btn-soft btn-info h-7" onClick={() => handleSort("email")}>Email</button>
                    <button className="btn btn-soft btn-info h-7" onClick={() => handleSort("username")}>UserName</button>
                </div>
                <SearchUser onSearch={handleSearch} />
            </div>

            <div className="overflow-x-auto sm:block hidden w-full max-w-[1000px] h-fit rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr className="bg-[#10284538]">
                            <th>ID</th>
                            <th className="dark:text-sky-700">Name</th>
                            <th className="dark:text-sky-700">Email</th>
                            <th className="dark:text-sky-700">UserName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    onClick={() => dispatch(selectUser(user))}
                                    className="hover:dark:bg-[#2f3a4630] cursor-pointer"
                                >
                                    <td className="dark:text-sky-700">{user.id}</td>
                                    <td className="dark:text-slate-300">{user.name}</td>
                                    <td className="dark:text-slate-300">{user.email}</td>
                                    <td className="dark:text-slate-300">{user.username}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
                                No users found matching your search
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex-col gap-3 flex sm:hidden items-center w-full">
                {sortedUsers.length > 0 ? (
                    sortedUsers.map((user) => (
                        <div key={user.id} onClick={() => dispatch(selectUser(user))} className="w-full max-w-[400px] border border-slate-200 rounded-lg p-3">
                            <div className="flex gap-1 text-xl">
                                <span className="text-sky-700">{user.id}</span>- <span className="text-slate-400">{user.name}</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="text-stone-400">UserName:</span>
                                <h2 className="text-slate-200">{user.username}</h2>
                            </div>
                            <div className="flex gap-1">
                                <span className="text-stone-400">Email:</span>
                                <h2 className="text-slate-200">{user.email}</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full max-w-[400px] border border-slate-200 rounded-lg p-3">Empty</div>
                )}
            </div>
            <div className="flex items-center gap-2 mt-4">
                <button
                    onClick={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`btn ${currentPage === 1 ? "btn-disabled" : "btn-info"}`}
                >
                    Prev
                </button>

                <span className="dark:text-white text-lg">Page {currentPage} of {totalPages}</span>

                <button
                    onClick={() => updatePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`btn ${currentPage === totalPages ? "btn-disabled" : "btn-info"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;
