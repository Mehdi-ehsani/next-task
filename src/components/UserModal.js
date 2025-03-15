"use client";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../core/features/userSlice";
import { useEffect, useRef } from "react";

const UserModal = () => {
	const { selectedUser, isModalOpen } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const modalRef = useRef(null);

	useEffect(() => {
		if (isModalOpen && modalRef.current) {
			modalRef.current.showModal();
		} else if (!isModalOpen && modalRef.current) {
			modalRef.current.close(); 
		}
	}, [isModalOpen]);


	const handleBackdropClick = (e) => {
		if (e.target === modalRef.current) {
			dispatch(closeModal());
		}
	};

	if (!selectedUser) return null;

	return (
		<dialog ref={modalRef} className="modal" onClick={handleBackdropClick}>
			<div className="modal-box">
				<button
					onClick={() => dispatch(closeModal())}
					className="btn btn-xs btn-ghost btn-circle hover:text-white text-black absolute right-2 top-2"
				>
					✕
				</button>

				<h2 className="text-xl font-bold mb-2 text-sky-700">{selectedUser.name}</h2>
				<p>
					<strong className="text-stone-400">Email:</strong> {selectedUser.email}
				</p>
				<p>
					<strong className="text-stone-400">Phone:</strong> {selectedUser.phone}
				</p>
				<p>
					<strong className="text-stone-400">Address:</strong> {selectedUser.address.street},{" "}
					{selectedUser.address.city}
				</p>
			</div>
		</dialog>
	);
};

export default UserModal;
