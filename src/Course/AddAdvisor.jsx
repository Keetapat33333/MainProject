import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddAdvisor = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    titlename:"",
    sec_id: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`${apiUrl}api/getSections`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched sections:", data);
          setSections(data);
        } else {
          console.error("Error fetching sections");
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน !");
      setMessage2("*โปรดตรวจสอบรหัสผ่านและยืนยันรหัสผ่าน");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return;
    }

    const requestBody = {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
      titlename: formData.titlename,
      sec_id: parseInt(formData.sec_id, 10),
    };

    if (formData.phone) {
      requestBody.phone = formData.phone;
    }

    if (formData.email) {
      requestBody.email = formData.email;
    }

    try {
      const response = await fetch(`${apiUrl}api/createAdvisor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setMessage("เพิ่มที่ปรึกษาสำเร็จ");
        setMessage2("*เพิ่มที่ปรึกษาสำเร็จ");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/course");
        }, 1000);
      } else {
        const errorData = await response.json();
        setMessage("โปรดกรอกข้อมูลให้ครบถ้วน");
        setMessage2("*โปรดตรวจสอบว่ากรอกข้อมูลครบแล้ว");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      }
    } catch (error) {
      setMessage("มีข้อผิดพลาดในการเพิ่มที่ปรึกษา !");
      setMessage2("*มีข้อผิดพลาดในการเพิ่มที่ปรึกษา");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="px-2 text-gray-400 text-sm flex items-center pt-28">
        <p className="cursor-pointer" onClick={() => navigate("/")}>
          หน้าแรก
        </p>
        <span className="mx-1">&gt;</span>
        <p className="cursor-pointer" onClick={() => navigate("/advice")}>
          เมนูอาจารย์
        </p>
        <span className="mx-1">&gt;</span>
        <p>เพิ่มที่ปรึกษา</p>
      </div>
      <div className="min-h-screen flex justify-center p-6 bg-gray-100">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 h-[900px]">
          <h2 className="text-2xl text-red font-bold mb-6 text-red-600">
            เพิ่มที่ปรึกษา
          </h2>
          <form>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-6">
              <div className="w-1/2">
                  <label className="block text-gray-700">คำนำหน้า</label>
                  <input
                    type="text"
                    name="titlename"
                    className="w-full mt-1 border border-gray-300 rounded p-2"
                    placeholder="คำนำหน้าขื่อ"
                    value={formData.titlename}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">ชื่อ</label>
                  <input
                    type="text"
                    name="firstname"
                    className="w-full mt-1 border border-gray-300 rounded p-2"
                    placeholder="ชื่อ"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">นามสกุล</label>
                  <input
                    type="text"
                    name="lastname"
                    className="w-full mt-1 border border-gray-300 rounded p-2"
                    placeholder="นามสกุล"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700">ชื่อผู้ใช้</label>
                <input
                  type="text"
                  name="username"
                  className="w-full mt-1 border border-gray-300 rounded p-2"
                  placeholder="ชื่อผู้ใช้"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">รหัสผ่าน</label>
                <input
                  type="password"
                  name="password"
                  className="w-full mt-1 border border-gray-300 rounded p-2"
                  placeholder="รหัสผ่าน"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">ยืนยันรหัสผ่าน</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full mt-1 border border-gray-300 rounded p-2"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">ห้องเรียน</label>
                <select
                  name="sec_id"
                  className="w-full max-w-xs mt-1 border border-gray-300 rounded p-2"
                  value={formData.sec_id}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    เลือกห้องเรียน
                  </option>
                  {sections.map((section) => (
                    <option key={section.sec_id} value={section.sec_id}>
                      {section.sec_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">เบอร์โทร</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full mt-1 border border-gray-300 rounded p-2"
                  placeholder="เบอร์โทร (ไม่จำเป็นต้องกรอก)"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">อีเมล</label>
                <input
                  type="email"
                  name="email"
                  className="w-full mt-1 border border-gray-300 rounded p-2"
                  placeholder="อีเมล (ไม่จำเป็นต้องกรอก)"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                className="px-6 py-2 bg-gray-100  border  rounded"
                onClick={() => navigate("/course")}
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                className="px-8 py-2 bg-red text-white rounded"
                onClick={handleSubmit}
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg modal-box">
            <h3 className="font-bold text-red text-xl pb-4">{message}</h3>
            <p className="text-lg py-4 text-gray-500">{message2}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdvisor;
