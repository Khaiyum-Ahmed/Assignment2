export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUsersData = {
  userId: number;
  userName: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: 'Active' | 'DeActive';
  hobbies: string[];
  address: TAddress;
  isDeleted: boolean;
};
