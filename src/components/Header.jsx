import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../utils/api';

function Header() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(users[0]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetchAllUsers()
			.then((data) => {
				console.log(data, '<<data od users');
				setIsLoading(false);
				setUsers(data);
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
				setIsLoading(false);
			});
	}, []);

	const handleUserChange = (event) => {
		const selectedUsername = event.target.value;
		const selectedUser = users.find(
			(user) => user.username === selectedUsername
		);
		setSelectedUser(selectedUser);
	};
	console.log(users);

	if (isLoading) {
		return <p className="Loading">LOADING</p>;
	}
	return (
		<div className="banner-logo">
			<div className="logo">
				<div className="box-1">N</div>
				<div className="box-2">C</div>
				<div className="box-3">N</div>
				<div className="network">Network</div>
			</div>
			<div className="logging-in-stuff">
				<div className="current-login">
					{selectedUser ? (
						<>
							{console.log(selectedUser)}
							<p>{selectedUser.name}</p>
							<img
								src={selectedUser.avatar_url}
								alt={selectedUser.username}
							/>
						</>
					) : (
						''
					)}
				</div>
				<div className="login">
					<select
						name="Login"
						id="login"
						onChange={handleUserChange}
						value={selectedUser ? selectedUser.username : ''}>
						<option value="initial">select a user</option>
						{users.map((user, index) => {
							return (
								<option key={index} value={user.username}>
									{user.username}
								</option>
							);
						})}
					</select>
				</div>
			</div>
		</div>
	);
}
export default Header;
