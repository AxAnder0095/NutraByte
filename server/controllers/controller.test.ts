export const getTestStatus = (res: any, req: any) => {
    try {
        res.status(200).json({ message: 'Test route is working!' });
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};