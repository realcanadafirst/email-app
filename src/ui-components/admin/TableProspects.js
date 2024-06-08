import { useEffect, useState } from "react";
import { fetchData } from '@ft/services/apiService';
import EmailAppModal from '@ft/ui-components/admin/EmailAppModal';
import DeleteIcon from '@ft/ui-components/ions/DeleteIcon';

const TableProspects = ({ setMessage }) => {
  const [pagination, setsetPagination] = useState({ page: 1, totalmumber: 0 });
  const [prospects, setProspects] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prospectsId, setProspectsId] = useState(null);
  useEffect(() => {
    getProspects();
  }, [pagination.page]);
  const getProspects = () => {
    fetchData(`/api/v1/prospects?page=${pagination.page}`, 'GET').then((res) => {
      if (res.status === 'success') {
        if (res.data?.result) {
          setProspects(res.data.result);
          setsetPagination(res.data.pagination);
        } else {
          setProspects(res.data.result);
          setsetPagination(res.data.pagination);
        }
      } else {
        setProspects([]);
        setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
      }
    });
  }
  const deleteProspects = () => {
    fetchData(`/api/v1/prospects?c_id=${prospectsId}`, 'DELETE').then((res) => {
      if (res.status === 'success') {
        getProspects();
        setMessage({ msg: 'Prospects deleted successfully!', type: 'success' });
      } else {
        setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
      }
    });
  }
  const handleModal = (value) => setIsModalOpen(value);
  const handleConfirmAction = () => {
    setIsModalOpen(false);
    deleteProspects();
  }
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default rounded-[10px] dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto rounded-[10px]">
        {pagination.totalmumber ? <div className="w-full table-auto flex justify-end px-4 py-5 text-black dark:text-white">
          Showing {pagination.page * 10} Of {pagination.totalmumber}
        </div> : null}
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primary text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-white dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-white dark:text-white">
                Number
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-white dark:text-white">
                Email
              </th>
              <th className="px-4 py-4 font-medium text-white dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {prospects && prospects.map((contact, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {contact.firstName} {contact.lastName}
                  </h5>
                  <span className="text-sm">
                    {contact.organization_name}
                  </span>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {contact.phoneNumber}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium text-black dark:text-white`}
                  >
                    {contact.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary text-black dark:text-white" onClick={() => {
                      setProspectsId(contact.id)
                      handleModal(true);
                    }}>
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(prospects && prospects.length < 1) &&
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
        {
          pagination?.totalmumber > 10 ? <nav className="w-full table-auto flex justify-center py-4">
            <ul className="flex flex-wrap items-center gap-4">
              <li>
                <span className={`flex items-center justify-center rounded bg-[#EDEFF1] px-3 py-1.5 text-xs font-medium text-black cursor-pointer ${pagination.page > 1 ? 'hover:bg-primary hover:text-white' : ''} `} onClick={() => {
                  if (pagination.page > 1) {
                    setsetPagination({ ...pagination, page: pagination.page - 1 })
                  }
                }}>Previous</span>
              </li>
              <li>
                <span className="flex items-center justify-center rounded px-3 py-1.5 font-medium bg-primary text-white">{pagination.page}</span>
              </li>
              <li>
                <span className={`flex items-center justify-center rounded bg-[#EDEFF1] px-3 py-1.5 text-xs font-medium text-black cursor-pointer ${pagination.page < (pagination.totalmumber / 10) ? 'hover:bg-primary hover:text-white' : ''}`} onClick={() => {
                  if (pagination.page < (pagination.totalmumber / 10)) {
                    setsetPagination({ ...pagination, page: parseInt(pagination.page) + 1 })
                  }
                }}>Next</span>
              </li>
            </ul>
          </nav> : null
        }
      </div>
      <EmailAppModal
        isOpen={isModalOpen}
        onClose={handleModal}
        onConfirm={() => { handleConfirmAction() }}>
        <p className="text-black dark:text-white"> Are you sure you want to delete prospect. </p>
      </EmailAppModal>
    </div>
  );
};

export default TableProspects;
