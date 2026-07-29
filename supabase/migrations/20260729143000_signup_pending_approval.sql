-- Cadastro com aprovação de admin:
-- todo novo usuário nasce PENDENTE (active = false) e captura o telefone.
-- Um administrador libera o acesso em /admin/usuarios (profiles.active = true).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  insert into public.profiles (id, email, full_name, phone, active)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'phone',
    false
  );
  return new;
end;
$function$;
