import type Permissions from './Permissions';

interface UserType {
	username?: string;
	email?: string;
	password?: string;
	id?: string;
	avatar?: string;
	created?: string;
	updated?: string;
	posts?: string[];
	permissions?: Permissions;
}

export default UserType;
