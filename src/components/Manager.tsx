import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Clipboard, Check, Edit, Trash, Loader  } from "lucide-react";

const Manager: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRows, setShowPasswordRows] = useState<{[key: string]: boolean;}>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);
  type Password = {_id: string; site: string; username: string; password: string;};
  const [passwords, setPasswords] = useState<Password[]>([]);
  type Form = {site: string; username: string; password: string;};
  const [form, setForm] = useState<Form>({ site: "", username: "", password: "",});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [loadingEdit, setLoadingEdit] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswordRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const getPasswords = async () => {
    let res = await fetch("http://localhost:3000/");
    let data = await res.json();
    setPasswords(data);
  };

  const handleAddPassword = async () => {
    if (!form.site || !form.username || !form.password || form.site.length < 3 || form.password.length < 3 || form.username.length < 3
    ) {
      alert("Please fill all the fields with at least 3 characters");
      return;
    }
    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    await fetch("http://localhost:3000/", { method, headers: { "Content-Type": "application/json",},
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });
    setForm({ site: "", username: "", password: "" });
    setEditingId(null);
    setLoading(false);
  };

  const handleDeletePassword = async (id: string) => {
    setLoadingDelete(id);
    await fetch("http://localhost:3000/", { method: "DELETE", headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ id }),});
      setLoadingDelete(null);
  };

  const handleEditPassword = async (pass : Password) => {
    setLoadingEdit(pass._id); 
    setEditingId(pass._id); 
    setForm({ site: pass.site, username: pass.username, password: pass.password });
    setLoadingEdit(null);
  };

  useEffect(() => {
    getPasswords();
  }, [passwords]);

  return (
    <>
      <div className="fixed top-0 left-0 z-[-2] w-full min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="mx-auto pt-8 w-full text-center text-gray-300 font-medium">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Password Manager</h1>
        <p className="text-sm sm:text-base lg:text-lg my-2 font-normal">Your own Password Manager</p>

        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-6 sm:p-8 mx-auto">
          <input type="text" placeholder="Enter website URL" className="w-full outline-none rounded-2xl border-1 border-gray-500 px-5 py-3 mb-6 bg-transparent text-white placeholder-gray-400" onChange={handleChangeInput}
          value={form.site} name="site" />

          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <input type="text" placeholder="Enter username" className="w-full sm:w-3/5 outline-none rounded-2xl border-1 border-gray-500 px-5 py-3 bg-transparent text-white placeholder-gray-400 mb-4 sm:mb-0" onChange={handleChangeInput} value={form.username} name="username" />

            <div className="relative w-full sm:w-2/5">
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-full outline-none rounded-2xl border-1 border-gray-500 px-5 py-3 pr-12 bg-tra text-white placeholder-gray-400" onChange={handleChangeInput} value={form.password} name="password" />
              <button type="button" className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}</button>
            </div>
          </div>

          <button className="w-full sm:w-auto rounded-full outline-none px-7 py-3 border-1 border-gray-400 mt-6 sm:mt-10 cursor-pointer hover:font-bold duration-300" onClick={handleAddPassword} disabled={loading}>{loading ? <Loader size={18} className="animate-spin"/> : editingId ? "Update Password" : "Add Password"}</button>
        </div>
      </div>

      <div className="overflow-x-auto mx-5">
        {passwords.length === 0 ? (<p className="text-gray-300 text-center text-xl">No passwords found</p>
        ) : (
          <table className="w-5/6 min-w-[500px] mx-auto my-5 text-gray-300 text-center border border-gray-600 rounded-lg shadow-lg">
            <thead className="bg-gray-900 text-gray-200 uppercase">
              <tr>
                <th className="py-3 px-5 border-1 border-gray-600 box-border">Site</th>
                <th className="py-3 px-5 border-1 border-gray-600 box-border">Username</th>
                <th className="py-3 px-5 border-1 border-gray-600 box-border">Password</th>
                <th className="py-3 px-5 border-1 border-gray-600 box-border">Edit</th>
                <th className="py-3 px-5 border-1 border-gray-600 box-border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((pass) => {
                return (
                  <tr key={pass._id}>
                    <td className="py-3 px-5 min-w-xs border border-gray-600">
                      <a href={`${pass.site}`} target="_blank">{pass.site}</a>
                      <button onClick={() => copyToClipboard(`${pass.site}`, "site")} className="text-gray-400 hover:text-white cursor-pointer float-right">{copiedField === "site" ? (<Check size={18} />
                        ) : (<Clipboard size={18} />)}</button>
                    </td>
                    <td className="py-3 px-5 border border-gray-600 min-w-xs">
                      <span>{pass.username}</span>
                      <button onClick={() => copyToClipboard(`${pass.username}`, "username")} className="text-gray-400 hover:text-white cursor-pointer float-right">{copiedField === "username" ? (<Check size={18} />) : (<Clipboard size={18} />)}</button>
                    </td>
                    <td className="py-3 px-5 border border-gray-600">
                      <div className="relative flex justify-center items-center space-x-2 min-w-xs">
                        <input type={showPasswordRows[pass._id] ? "text" : "password"} className="outline-none border-none bg-transparent text-white text-center w-32 sm:w-40" value={pass.password} readOnly />
                        <button type="button" className="absolute right-10 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={() => togglePasswordVisibility(pass._id)}>{showPasswordRows[pass._id] ? (<Eye size={18} />) : (<EyeOff size={18} />)}</button>
                        <button onClick={() => copyToClipboard(`${pass.password}`, "password")} className="absolute right-2 text-gray-400 hover:text-white cursor-pointer" > {copiedField === "password" ? ( <Check size={18} /> ) : ( <Clipboard size={18} /> )}</button>
                      </div>
                    </td>
                    <td className="py-3 pr-5 border border-gray-600">
                      <button className="ml-5 text-gray-400 hover:text-white cursor-pointer" onClick={() => handleEditPassword(pass)} disabled={loadingEdit === pass._id}>{loadingEdit === pass._id ? <Loader size={18} className="animate-spin"/> : <Edit size={18} />}</button>
                    </td>
                    <td className="py-3 pr-5 border border-gray-600">
                      <button className="ml-5 text-gray-400 hover:text-white cursor-pointer" onClick={() => handleDeletePassword(pass._id)} disabled={loadingDelete === pass._id}>{loadingDelete === pass._id ? <Loader size={18} className="animate-spin"/> : <Trash size={18} />}</button>
                    </td>
                  </tr>);})}
            </tbody>
          </table>)}
      </div>
    </>
  );
};

export default Manager;