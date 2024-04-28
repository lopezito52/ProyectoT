import React from 'react';
import { useForm } from 'react-hook-form';
import { Titulos } from '../../Components/Titulos';
import { Subitulos } from '../../Components/Subtitulos';
import { Link } from 'react-router-dom'; // Importa el componente Link

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-14">
        <div><Titulos label={"Bienvenido"} /></div>

        <div>
          <Subitulos label={"Ingresa tu email"} />
          <div className='flex p-2'></div>
          <input className="flex flex-col border-4 w-80" type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        </div>

        <div>
          <Subitulos label={"Ingresa tu contraseña"} />
          <div className='flex p-2'></div>
          <input className="flex flex-col border-4 w-80" type="password" placeholder="Password" {...register("password", {required: true})} />
        </div> 

        <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      </form>

      <div className='flex flex-col gap-2 p-4'><Subitulos label={"¿No tienes una cuenta?"} />
      <Link to="/registro">Da click aquí</Link>
      </div>
    </div>
  );
}
