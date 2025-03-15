import UserTable from "@/components/UserTable";
import UserModal from "@/components/UserModal";

export default async function Home({ searchParams }) {
	try {
		const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
		const limit = 5;
		const searchQuery = searchParams?.search || "";

		const res = await fetch(
			`https://jsonplaceholder.typicode.com/users?q=${searchQuery}&_page=${page}&_limit=${limit}`
		);
		const data = await res.json();
		if (!res.ok) {
			throw new Error("Failed to fetch users");
		}

		const totalUsersRes = await fetch(
			`https://jsonplaceholder.typicode.com/users?q=${searchQuery}`
		);
		const totalUsers = await totalUsersRes.json();
		const totalPages = Math.ceil(totalUsers.length / limit);
		if (!totalUsersRes.ok) {
			throw new Error("Failed to fetch users");
		}
		return (
			<div>
				<UserTable
					usersData={data}
					totalPages={totalPages}
					currentPage={page}
				/>
				<UserModal />
			</div>
		);
	} catch (error) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-red-500 text-2xl">
        "Failed to fetch users"
				</h1>
				<p className="text-gray-400">Please Try Again Later</p>
			</div>
		);
	}
}
