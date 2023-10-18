import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HealthPackageForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [doctorDiscount, setDoctorDiscount] = useState('')
    const [medicineDiscount, setMedicineDiscount] = useState('')
    const [familyMemberDiscount, setFamilyMemberDiscount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const healthpackage = { name, price, doctorDiscount,medicineDiscount,familyMemberDiscount };

    // Reset error and emptyFields state
    setError(null);
    setEmptyFields([]);

    if (!name) {
      setEmptyFields([...emptyFields, 'name']);
    }

    if (!price) {
      setEmptyFields([...emptyFields, 'price']);
    }
    if (!doctorDiscount) {
      setEmptyFields([...emptyFields, 'doctorDiscount']);
    }
    if (!medicineDiscount) {
      setEmptyFields([...emptyFields, 'medicineDiscount']);
    }
    if (!familyMemberDiscount) {
      setEmptyFields([...emptyFields, 'familyMemberDiscount']);
    }

   
    const response = await fetch('/api/healthpackages', {
      method: 'POST',
      body: JSON.stringify(healthpackage),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setName('');
      setPrice('');
      setDoctorDiscount('');
      setMedicineDiscount('');
      setFamilyMemberDiscount('');
      console.log('New health package added');
      navigate('/admin-view-healthpackages');
    }
  };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new Health Package</h3>
            <label>Package Name: </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Price: </label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error' : ''}
            />
            <label>Doctor Session Discount (Percentage): </label>
            <input
                type="number"
                onChange={(e) => setDoctorDiscount(e.target.value)}
                value={doctorDiscount}
                className={emptyFields.includes('doctorDiscount') ? 'error' : ''}
            />
            <label>Medicine Discount (Percentage): </label>
            <input
                type="number"
                onChange={(e) => setMedicineDiscount(e.target.value)}
                value={medicineDiscount}
                className={emptyFields.includes('medicineDiscount') ? 'error' : ''}
            />
            <label>Family Member Discount (Percentage): </label>
            <input
                type="number"
                onChange={(e) => setFamilyMemberDiscount(e.target.value)}
                value={familyMemberDiscount}
                className={emptyFields.includes('familyMemberDiscount') ? 'error' : ''}
            />

          
            <button>Add Health Package</button>
            {error && <div className="error">{error}</div>}
            <div className='back-button'>
            <Link to="/admin-view-healthoackages">
                <button className='normal-button'>Back To all Health Packages</button>
            </Link>
            </div>
        </form>
    )
}
export default HealthPackageForm