using System.Linq.Expressions;

namespace API.DataBase.Repository
{
    public interface IBaseRepository<T>
    {
        Task<T> Add(T entity);
        Task<T?> GetById(int id);
        Task<List<T>> GetAll(params Expression<Func<T, object>>[] includes);

        Task Delete(T entity);

        Task Update(T entity);

        Task<T> AddWithDto<DTO>(DTO Dto);
    }
}
