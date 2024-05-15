import { useEffect, useState } from "react";
import { fetchData } from '@ft/services/apiService';
import EmailAppModal from '@ft/ui-components/admin/EmailAppModal';
import DeleteIcon from '@ft/ui-components/ions/DeleteIcon';
import EditIcon from '@ft/ui-components/ions/EditIcon';
import { useRouter } from "next/router";

const TableTemplate = ({ setMessage }) => {
  const [templates, setTemplates] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templatesId, settemplatesId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    gettemplates()
  }, []);
  const gettemplates = () => {
    fetchData('/api/v1/templates', 'GET').then((res) => {
      if (res.status === 'success') {
        setTemplates(res.data)
      } else {
        setMessage({ msg: 'Failed to get templates please try again', type: 'error' });
      }
    });
  }
  const deletetemplates = () => {
    fetchData(`/api/v1/templates?c_id=${templatesId}`, 'DELETE').then((res) => {
      if (res.status === 'success') {
        gettemplates();
        setMessage({ msg: 'templates deleted successfully!', type: 'success' });
      } else {
        setMessage({ msg: 'Failed to get templates please try again', type: 'error' });
      }
    });
  }
  const handleModal = (value) => setIsModalOpen(value);
  const handleConfirmAction = () => {
    setIsModalOpen(false);
    deletetemplates();
  }
  const editTemplate = (id) => {
    router.push({ pathname: '/template/create', query: { templateId: encodeURI(id) } });
  }
  const removeTag = (template) => {
    try {
      const result = template.replace(/(<([^>]+)>)/ig, '');
      return result.replace(/&nbsp;/ig, ' ');
    } catch (error) {
      return <div
        id="show-template"
        dangerouslySetInnerHTML={{
          __html: `${template}`,
        }}
      />
    }
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
                Body
              </th>
              <th className="px-4 py-4 font-medium text-white dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {templates && templates.map((template, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {template.subject}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="text-black dark:text-white show-template">
                    {removeTag(template.template)}
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => {
                      settemplatesId(template.id)
                      handleModal(true);
                    }}>
                      <DeleteIcon />
                    </button>
                    <button className="hover:text-primary" onClick={() => {
                      editTemplate(template.id)
                    }}>
                      <EditIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(templates && templates.length < 1) &&
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
      <EmailAppModal
        isOpen={isModalOpen}
        onClose={handleModal}
        onConfirm={() => { handleConfirmAction() }}>
        <p> Are you sure you want to delete template. </p>
      </EmailAppModal>
    </div>
  );
};

export default TableTemplate;
