import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FormField, Loader} from '../components';
import {preview} from '../assets';
import {getRandomPrompt} from '../utils';

const CreatePost = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [generateImg, setGenerateImg] = useState(false);
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    })

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGenerateImg(true);
                const response = await fetch("https://ai-image-generator-dyf5.onrender.com/api/v1/dalle", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                });
    
                const data = await response.json();
                if (response.ok) {
                    const photoData = data.photo.startsWith('data:image/')
                        ? data.photo
                        : `data:image/jpeg;base64,${data.photo}`;
                    
                    setForm({ ...form, photo: photoData });
                } else {
                    alert(`Error: ${data.error || 'Failed to generate image'}`);
                }
            } catch (err) {
                alert("Error generating image. Please try again.");
                console.error(err);
            } finally {
                setGenerateImg(false);
            }
        } else {
            alert("Please enter a prompt.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (form.prompt && form.photo) {
          setLoading(true);
          try {
            const response = await fetch('https://ai-image-generator-dyf5.onrender.com/api/v1/post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...form }),
            });
    
            await response.json();
            alert('Success');
            navigate('/');
          } catch (err) {
            alert(err);
          } finally {
            setLoading(false);
          }
        } else {
          alert('Please generate an image with proper details');
        }
      };
    
    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})

    }
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({...form, prompt: randomPrompt});
    }

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222238] text-[32px]">Create</h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                    Create imagainative and visually stunning images with AI and share them with the community
                </p>
            </div>
            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <FormField 
                      labelName="Your Prompt"
                      type="text"
                      name="prompt"
                      placeholder="John Doe"
                      value={form.prompt}
                      handleChange={handleChange}
                      isSurpriseMe
                      handleSurpriseMe = {handleSurpriseMe}
                    />
                    <div className="relative bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex
                      justify-center items-center">
                        {form.photo ? (
                            <img
                              src={form.photo}
                              alt={form.photo}
                              className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                              src={preview}
                              alt="preview"
                              className="w-9/12 h-9/12 object-contain opacity-40"
                            />
                        )}
                        {generateImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5 flex gap-5">
                    <button
                      type="button"
                      onClick={generateImage}
                      className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      {generateImg ? 'Generating Image...' : 'Generate Image'}
                    </button>
                </div>
                <div className="mt-10">
                  <FormField 
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        handleChange={handleChange}
                  />
                    <p className="mt-2 text-[#666e75] text-[14px]">
                        Once you have created the image you want,you can share it with others in the community
                    </p>
                    <button
                      type="submit"
                      className="mt-3 text-white bg-[#4649ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {loading ? 'Sharing...' : 'Share with Community'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default CreatePost;