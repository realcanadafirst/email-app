import { useEffect, useState } from "react";
import { fetchData } from '@ft/services/apiService';

const TableUsers = ({ setMessage }) => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetchData('/api/v1/users', 'GET').then((res) => {
      if (res.status === 'success') {
        setUsers(res.data)
      } else {
        setUsers([]);
        setMessage({ msg: 'Failed to get users please try again', type: 'error' });
      }
    });
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default rounded-[10px] dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto rounded-[10px]">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primary text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-white dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-white dark:text-white">
                Org Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-white dark:text-white">
                Email
              </th>
              <th className="px-4 py-4 font-medium text-white dark:text-white">
                Password
              </th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((contact, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {contact.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {contact.org_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}
                  >
                    {contact.email}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <input
                    type="password"
                    readOnly
                    value={contact.password}
                  />
                </td>
              </tr>
            ))}
            {(users && users.length < 1) &&
              <tr>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-center" colSpan={4}>
                  <h5 className="font-medium text-black dark:text-white">
                    No Record Found
                  </h5>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
