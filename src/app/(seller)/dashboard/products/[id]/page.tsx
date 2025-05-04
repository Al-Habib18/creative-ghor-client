/** @format */

export default function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Edit Product #{id}</h1>
            <p>Product editing form or details will go here.</p>
        </div>
    );
}
