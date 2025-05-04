import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Header } from '../components/Header';
import { Transaction } from '../types/Transaction';
import { AppDispatch } from '../../main';
import { useDispatch } from 'react-redux';
import { transactionAdded } from '../redux/slices/transactionsSlice';
import { useNavigate } from 'react-router-dom';

export function AddTransactions() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Transaction>()

    const submitTransactionData = async (data: Transaction) => {
        try {
            const response = await fetch('http://localhost:8080/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response.status);
        } catch (err) {
            console.error('There was an error fetching the data:', err);
        }
    }

    const onSubmit: SubmitHandler<Transaction> = (data) => {
        console.log(data)
        dispatch(transactionAdded(data))
        submitTransactionData(data)
        //if submit successful go back to transaction page
        navigate('/transactions')
    }

    return (
        <>
            <Header title='Add Transaction' />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Grid container spacing={2}>
                        <Controller
                            control={control}
                            name='date'
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (<DatePicker
                                    label="Date"
                                    defaultValue={field.value}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date?.format('MM/DD/YYYY'));
                                    }}
                                />)
                            }}
                        />
                        {errors.date && <span>This field is required</span>}

                        <TextField label='Description' {...register('description', { required: true })} />
                        {errors.description && <span>This field is required</span>}

                        <TextField label='Amount' type='number'  {...register('amount', { required: true, valueAsNumber: true })} />
                        {errors.amount && <span>This field is required</span>}

                        <Select defaultValue='' {...register('category', { required: true })}>
                            <MenuItem value='Deposits'>Deposits</MenuItem>
                            <MenuItem value='Recurring'>Recurring</MenuItem>
                            <MenuItem value='Utilities'>Utilities</MenuItem>
                        </Select>
                        {errors.category && <span>This field is required</span>}
                    </Grid>
                    <Button variant='contained' type="submit">Submit</Button>
                </FormControl>
            </form>
            <Button variant='text'>+ Add Row</Button>

        </>
    )
}